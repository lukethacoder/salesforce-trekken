use std::process::Command;

use super::schema::display::{AllDisplay, Display};

pub async fn display(username: &str) -> Result<Display, String> {
    let cmd_string = String::from_utf8(if cfg!(target_os = "windows") {
        // try calling via FE - see if it drops the need for a cmd window to open and run
        // or try and run this headless somehow?
        Command::new("cmd")
            .args([
                "/C",
                format!("sfdx force:org:display -u {} --json", username.to_string()).as_str(),
            ])
            .output()
            .expect("failed to execute process")
            .stdout
    } else {
        Command::new("sh")
            .arg("-c")
            .arg(format!("sfdx force:org:display -u {} --json", username.to_string()).as_str())
            .output()
            .expect("failed to execute process")
            .stdout
    })
    .unwrap();

    let response: AllDisplay = serde_json::from_str(cmd_string.as_str()).unwrap();
    if response.result.is_some() {
        return Ok(response.result.unwrap());
    }

    Err(response
        .message
        .unwrap_or("Unable to authenticate org".to_string()))
}
