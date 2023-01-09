use std::fs::{self, File};
use std::io::Write;
use std::path::Path;

use bytes::Bytes;
use zip;

use super::media;
use super::schema::content::{ContentExport, ContentExportImage};
use super::utils::norm;

pub async fn zip_metadata(
    base_url: &str,
    access_token: &str,
    export_path: &str,
    channel_id: &str,
    content: &Vec<ContentExport>,
    images: &Vec<ContentExportImage>,
) -> Result<(String, String), String> {
    println!(
        "Converting metadata and zipping {} content items and {} images...\n ",
        &content.len(),
        &images.len()
    );

    let export_path_base = format!("{}", export_path);
    if !Path::new(&export_path_base).exists() {
        fs::create_dir_all(&export_path_base).expect("Failed to create image export directory");
    }

    let content_zip_source = handle_content(&export_path_base.as_str(), channel_id, content)
        .await
        .unwrap();

    let image_zip_source = match images.len() {
        0 => "".to_string(),
        _ => handle_images(
            &export_path_base.as_str(),
            base_url,
            access_token,
            channel_id,
            images,
        )
        .await
        .unwrap(),
    };

    Ok((norm(&content_zip_source), norm(&image_zip_source)))
}

async fn handle_images(
    export_path_base: &str,
    base_url: &str,
    access_token: &str,
    channel_id: &str,
    images: &Vec<ContentExportImage>,
) -> Result<String, String> {
    let zip_file_name = format!("1-media-{}", channel_id);
    let path_to_zip = format!("{}/{}.zip", export_path_base, zip_file_name);

    // Init Zip
    let zip_file = File::create(&path_to_zip).expect("Error creating zip file test");
    let mut zip = zip::ZipWriter::new(zip_file);
    let options =
        zip::write::FileOptions::default().compression_method(zip::CompressionMethod::Stored);

    let client = reqwest::Client::new();

    // TODO: for each image, fetch via the REST API and save to response to the zip file
    // see if we can get this running on multiple threads concurrently
    for image in images.into_iter() {
        let response: Bytes =
            media::by_id(client.clone(), base_url, access_token, channel_id, &image)
                .await
                .expect("Unable to fetch image data ");

        let file_name = &image.body.source.ref_value;
        let image_source_path = format!("_media/{}", file_name.clone());

        // write the image source to the _media folder
        zip.start_file(image_source_path, options)
            .expect(format!("Error creating file {}", &file_name).as_str());

        zip.write(&response)
            .expect(format!("Error saving buffer to file {} ", &file_name).as_str());

        // write json data to the root of the export zip
        zip.start_file(format!("{}.json", image.body.title), options)
            .expect(format!("Error creating file {}", &file_name).as_str());

        let json_as_bytes = serde_json::to_vec(image).expect("error unwrapping image metadata");
        zip.write(&json_as_bytes)
            .expect(format!("Error saving buffer to file {} ", &file_name).as_str());
    }

    // apply the changes to the zip file
    zip.finish().expect("Error closing off zip file");

    Ok(path_to_zip)
}

async fn handle_content(
    export_path_base: &str,
    channel_id: &str,
    content: &Vec<ContentExport>,
) -> Result<String, String> {
    let zip_file_name = format!("1-content-{}", channel_id);
    let path_to_zip = format!("{}/{}.zip", export_path_base, zip_file_name);

    // Init Zip
    let zip_file = File::create(&path_to_zip).expect("Error creating zip file test");
    let mut zip = zip::ZipWriter::new(zip_file);
    let options =
        zip::write::FileOptions::default().compression_method(zip::CompressionMethod::Stored);

    // for each item, write metadata to JSON and write into the zip file
    for content_item in content.into_iter() {
        let file_name = format!("{}-{}", &content_item.url_name, &content_item.content_key);

        // write json data to the root of the export zip
        zip.start_file(format!("{}.json", &file_name), options)
            .expect(format!("Error creating file {}", &file_name).as_str());

        // convert the object to bytes to write to the zip file
        let json_as_bytes =
            serde_json::to_vec(content_item).expect("error unwrapping content metadata");
        zip.write(&json_as_bytes)
            .expect(format!("Error saving buffer to file {} ", &file_name).as_str());
    }

    // apply the changes to the zip file
    zip.finish().expect("Error closing off zip file");

    Ok(path_to_zip)
}
