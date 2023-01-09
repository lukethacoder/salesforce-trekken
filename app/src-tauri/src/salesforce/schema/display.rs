use serde::{Deserialize, Serialize};

#[derive(Debug, Default, Clone, Serialize, Deserialize)]
pub struct AllDisplay {
    pub status: i64,
    pub result: Option<Display>,
    pub warnings: Vec<String>,
    pub message: Option<String>,
}

#[derive(Debug, Default, Clone, Serialize, Deserialize)]
pub struct Display {
    pub id: Option<String>,
    #[serde(rename = "accessToken")]
    pub access_token: Option<String>,
    #[serde(rename = "instanceUrl")]
    pub instance_url: Option<String>,
    pub username: Option<String>,
    #[serde(rename = "clientId")]
    pub client_id: Option<String>,
    #[serde(rename = "connectedStatus")]
    pub connected_status: Option<String>,
    pub status: Option<String>,
    pub alias: Option<String>,
}
