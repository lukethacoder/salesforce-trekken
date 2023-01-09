use reqwest::{
    self,
    header::{HeaderMap, ACCEPT, AUTHORIZATION, CONTENT_TYPE},
};

use super::schema::channel::{AllChannels, Channel};

pub async fn all(
    client: reqwest::Client,
    base_url: &str,
    access_token: &str,
) -> Result<Vec<Channel>, String> {
    // AllChannels
    println!("Fetching all Channels...\n");

    let request_url = format!(
        "{base_url}/services/data/v{api_version}/connect/cms/delivery/channels?page={page}&pageSize={page_size}",
        base_url = base_url,
        api_version = "54.0",
        page = "0",
        page_size = "25"
    );

    let mut list_of_channels: Vec<Channel> = vec![];

    // keep track of the next url (if there is one)
    let mut next_request_url = Some(request_url);

    // recursively request for paginated channels
    while next_request_url.is_some() {
        let this_url = next_request_url.unwrap();

        let barer = format!("Bearer {}", access_token);

        let mut headers = HeaderMap::new();
        headers.insert(AUTHORIZATION, barer.parse().unwrap());
        headers.insert(CONTENT_TYPE, "application/json".parse().unwrap());
        headers.insert(ACCEPT, "application/json".parse().unwrap());

        let response = client
            .get(this_url)
            .headers(headers)
            .send()
            .await
            .expect("Error fetching channels");

        let status_code = response.status();
        if status_code != 200 {
            let error_response = response.text().await;
            return match error_response {
                Ok(json_error) => Err(json_error),
                _ => Err(format!("Error {:?}", status_code)),
            };
        }

        let json = response
            .json::<AllChannels>()
            .await
            .expect("Error serialising response payload");

        // append all channels to vec
        list_of_channels.append(&mut json.channels.clone());

        // check if there are more channels to query for
        next_request_url = match json.next_page_url.is_some() {
            true => Some(format!(
                "{base_url}{next_url}",
                base_url = base_url,
                next_url = json.next_page_url.unwrap()
            )),
            _ => None,
        };
    }

    Ok(list_of_channels)
}
