#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::process::Command;
#[cfg(target_os = "linux")]
use std::fs::metadata;
#[cfg(target_os = "linux")]
use std::path::PathBuf;
use tauri::Manager;

mod salesforce;
use salesforce::schema::channel::Channel;
use salesforce::schema::content::{Content, ContentExport, ContentExportImage, ManagedContentType};
use salesforce::schema::display::Display;
use salesforce::schema::info::Info;
use salesforce::schema::org::Org;

#[tauri::command]
async fn sfdx_orgs_all() -> Result<Vec<Org>, ()> {
    Ok(salesforce::list::run().await.unwrap())
}

#[tauri::command]
async fn sfdx_display(username: &str) -> Result<Display, String> {
    salesforce::display::display(username).await
}

#[tauri::command]
async fn channels_all(access_token: &str, base_url: &str) -> Result<Vec<Channel>, String> {
    let client = reqwest::Client::new();
    salesforce::channels::all(client, base_url, access_token).await
}

#[tauri::command]
async fn content_all_by_channel_id(
    access_token: &str,
    base_url: &str,
    channel_id: &str,
) -> Result<(Vec<Content>, Vec<ManagedContentType>), String> {
    let client = reqwest::Client::new();
    salesforce::content::by_channel_id(client, base_url, access_token, channel_id).await
}

#[tauri::command]
async fn zip_content(
    access_token: &str,
    base_url: &str,
    export_path: &str,
    channel_id: &str,
    content: Vec<ContentExport>,
    images: Vec<ContentExportImage>,
) -> Result<(String, String), String> {
    println!("{:?} ", &images);
    salesforce::zip::zip_metadata(
        base_url,
        access_token,
        export_path,
        channel_id,
        &content,
        &images,
    )
    .await
}

#[tauri::command]
async fn info(access_token: &str, base_url: &str) -> Result<Info, String> {
    let client = reqwest::Client::new();
    salesforce::info::get(client, base_url, access_token).await
}

// https://github.com/tauri-apps/tauri/issues/4062
#[tauri::command]
fn show_in_folder(path: String) {
    #[cfg(target_os = "windows")]
    {
        Command::new("explorer")
            .args(["/select,", &path]) // The comma after select is not a typo
            .spawn()
            .unwrap();
    }

    #[cfg(target_os = "linux")]
    {
        if path.contains(",") {
            // see https://gitlab.freedesktop.org/dbus/dbus/-/issues/76
            let new_path = match metadata(&path).unwrap().is_dir() {
                true => path,
                false => {
                    let mut path2 = PathBuf::from(path);
                    path2.pop();
                    path2.into_os_string().into_string().unwrap()
                }
            };
            Command::new("xdg-open").arg(&new_path).spawn().unwrap();
        } else {
            Command::new("dbus-send")
                .args([
                    "--session",
                    "--dest=org.freedesktop.FileManager1",
                    "--type=method_call",
                    "/org/freedesktop/FileManager1",
                    "org.freedesktop.FileManager1.ShowItems",
                    format!("array:string:\"file://{path}\"").as_str(),
                    "string:\"\"",
                ])
                .spawn()
                .unwrap();
        }
    }

    #[cfg(target_os = "macos")]
    {
        Command::new("open").args(["-R", &path]).spawn().unwrap();
    }
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            // only include this code on debug builds
            #[cfg(debug_assertions)]
            {
                let window = app.get_window("main").unwrap();
                window.open_devtools();
                window.close_devtools();
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            sfdx_orgs_all,
            sfdx_display,
            channels_all,
            content_all_by_channel_id,
            zip_content,
            show_in_folder,
            info
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
