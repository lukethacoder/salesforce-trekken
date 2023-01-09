use std::collections::HashMap;

use reqwest;

use crate::salesforce::schema::content::ManagedContentType;

use super::schema::content::{AllContent, Content};

pub async fn by_channel_id(
    client: reqwest::Client,
    base_url: &str,
    access_token: &str,
    channel_id: &str,
) -> Result<(Vec<Content>, Vec<ManagedContentType>), String> {
    // AllChannels
    println!("Fetching all Channels...\n");

    let request_url = format!(
        "{base_url}/services/data/v{api_version}/connect/cms/delivery/channels/{channel_id}/contents/query?includeMetadata=true&page={page}&pageSize={page_size}&showAbsoluteUrl=true",
        base_url = base_url,
        api_version = "54.0",
        channel_id = channel_id,
        page = "0",
        page_size = "50"
    );

    let mut list_of_content: Vec<Content> = vec![];
    let mut managed_content_types: HashMap<String, ManagedContentType> = HashMap::new();

    // keep track of the next url (if there is one)
    let mut next_request_url = Some(request_url);

    // recursively request for paginated channels
    while next_request_url.is_some() {
        let this_url = next_request_url.unwrap();

        let response = client
            .get(this_url)
            .bearer_auth(access_token)
            // .basic_auth(username, Some(password))
            // .header("Accept", "*/*")
            .send()
            .await
            .expect("Error fetching channels");

        if response.error_for_status_ref().is_err() {
            println!("response {:?} ", &response);
            next_request_url = None;
            return Err(format!("Invalid Request"));
        }

        let json = response
            .json::<AllContent>()
            .await
            .expect("Error serialising response payload");

        next_request_url = None;

        // append all channels to vec
        list_of_content.append(&mut json.items.clone());

        // append new ManagedContentTypes
        for (key, managed_content_type) in &json.managed_content_types {
            if !managed_content_types.contains_key(key) {
                managed_content_types.insert(key.clone(), managed_content_type.clone());
            }
        }

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

    Ok((
        list_of_content,
        managed_content_types.into_values().collect(),
    ))
}
