use reqwest;

use super::schema::info::Info;

pub async fn get(
    client: reqwest::Client,
    base_url: &str,
    access_token: &str,
) -> Result<Info, String> {
    // AllChannels
    println!("Fetching all Channels...\n");

    let request_url = format!(
        "{base_url}/services/data/v{api_version}/chatter/users/me",
        base_url = base_url,
        api_version = "54.0"
    );

    let res = client
        .get(request_url)
        .bearer_auth(access_token)
        .send()
        .await;

    if res.is_err() {
        let error = res.err().unwrap();
        println!("error {:?} ", &error);
        return Err(format!("{}", &error.to_string()));
    }

    let response = res.unwrap();

    if response.error_for_status_ref().is_err() {
        let error_payload = &response
            .text()
            .await
            .expect("Should have returned a valid error");
        println!("response {:?} ", &error_payload);
        return Err(format!("{}", &error_payload));
    }

    let json = response
        .json::<Info>()
        .await
        .expect("Error serialising response payload");

    Ok(json)
}
