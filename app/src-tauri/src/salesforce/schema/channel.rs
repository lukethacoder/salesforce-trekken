use serde::{Serialize, Deserialize};

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct AllChannels {
  pub channels: Vec<Channel>,
  #[serde(rename = "currentPageUrl")]
  pub current_page_url: String,
  #[serde(rename = "nextPageUrl")]
  pub next_page_url: Option<String>,
  #[serde(rename = "previousPageUrl")]
  pub previous_page_url: Option<String>,
  #[serde(rename = "totalChannels")]
  pub total_channels: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Channel {
  #[serde(rename = "channelId")]
  pub channel_id: String,
  #[serde(rename = "channelName")]
  pub channel_name: String,
  #[serde(rename = "channelType")]
  pub channel_type: String,
  pub domain: Option<String>,
  #[serde(rename = "domainName")]
  pub domain_name: Option<String>,
  #[serde(rename = "isChannelSearchable")]
  pub is_channel_searchable: bool,
  #[serde(rename = "isDomainLocked")]
  pub is_domain_locked: bool,
}