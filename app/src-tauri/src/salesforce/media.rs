use bytes::Bytes;
use reqwest;

use super::schema::content::ContentExportImage;

pub async fn by_id(
    client: reqwest::Client,
    base_url: &str,
    access_token: &str,
    channel_id: &str,
    content_export_image: &ContentExportImage,
) -> Result<Bytes, String> {
    println!(
        "Fetching CMS Image content with content_key: {} ...\n ",
        &content_export_image.content_key
    );

    let request_url = format!(
      "{base_url}/services/data/v{api_version}/connect/cms/delivery/channels/{channel_id}/media/{content_key}/content",
      base_url = base_url,
      api_version = "54.0",
      channel_id = channel_id,
      content_key = &content_export_image.content_key
    );

    let response = client
        .get(request_url)
        .bearer_auth(access_token)
        .send()
        .await
        .expect("Error fetching CMS Image Data");

    if response.error_for_status_ref().is_err() {
        return Err(format!("Invalid Request"));
    }

    let response_bytes: Bytes = response
        .bytes()
        .await
        .expect("Error converting response to bytes");

    Ok(response_bytes)
}
