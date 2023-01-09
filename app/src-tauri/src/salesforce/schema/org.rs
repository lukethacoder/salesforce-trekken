use serde::{Serialize, Deserialize};

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Org {
  pub username: String,
  pub access_token: String,
  pub instance_url: String,
  #[serde(default)]
  pub org_id: String,
  #[serde(default)]
  pub login_url: String,
  #[serde(default)]
  pub refresh_token: String,
  #[serde(default)]
  pub client_id: String,
  #[serde(default)]
  pub instance_api_version: String,
  #[serde(default)]
  pub instance_api_version_last_retrieved: String,
  #[serde(default)]
  pub is_dev_hub: bool,
  #[serde(default)]
  pub dev_hub_username: String,
  #[serde(default)]
  pub created: String,
  #[serde(default)]
  pub expiration_date: String,
  #[serde(default)]
  pub created_org_instance: String,
}