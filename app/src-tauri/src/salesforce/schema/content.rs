use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct ContentExport {
    #[serde(rename = "contentKey")]
    pub content_key: String,
    #[serde(rename = "urlName")]
    pub url_name: String,
    #[serde(rename = "type")]
    pub item_type: String,
    // dynamic key/value objects that will differ between CMS types
    pub body: HashMap<String, serde_json::Value>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct ContentExportImage {
    #[serde(rename = "contentKey")]
    pub content_key: String,
    #[serde(rename = "urlName")]
    pub url_name: String,
    #[serde(rename = "type")]
    pub item_type: String,
    pub body: ContentExportImageBody,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct ContentExportImageBody {
    pub source: ContentExportImageBodySource,
    pub title: String,
    #[serde(rename = "altText")]
    pub alt_text: Option<String>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct ContentExportImageBodySource {
    #[serde(rename = "ref")]
    pub ref_value: String,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct AllContent {
    #[serde(rename = "currentPageUrl")]
    pub current_page_url: String,
    pub items: Vec<Content>,
    #[serde(rename = "managedContentTypes")]
    pub managed_content_types: HashMap<String, ManagedContentType>,
    #[serde(rename = "nextPageUrl")]
    pub next_page_url: Option<String>,
    pub total: i64,
    #[serde(rename = "totalTypes")]
    pub total_types: i64,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Content {
    #[serde(rename = "contentKey")]
    pub content_key: String,
    #[serde(rename = "contentNodes")]
    pub content_nodes: HashMap<String, Option<HashMap<String, Option<serde_json::Value>>>>,
    #[serde(rename = "contentUrlName")]
    pub content_url_name: String,
    pub language: String,
    #[serde(rename = "managedContentId")]
    pub managed_content_id: String,
    #[serde(rename = "publishedDate")]
    pub published_date: String,
    pub title: Option<String>,
    #[serde(rename = "type")]
    pub item_type: String,
    #[serde(rename = "typeLabel")]
    pub type_label: String,
    #[serde(rename = "unauthenticatedUrl")]
    pub unauthenticated_url: Option<String>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct ContentNodes {
    pub source: Option<Source>,
    pub title: Option<Title>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Source {
    #[serde(rename = "fileName")]
    pub file_name: String,
    #[serde(rename = "isExternal")]
    pub is_external: bool,
    #[serde(rename = "mediaType")]
    pub media_type: String,
    #[serde(rename = "mimeType")]
    pub mime_type: String,
    #[serde(rename = "nodeType")]
    pub node_type: String,
    #[serde(rename = "referenceId")]
    pub reference_id: String,
    #[serde(rename = "resourceUrl")]
    pub resource_url: String,
    #[serde(rename = "unauthenticatedUrl")]
    pub unauthenticated_url: String,
    pub url: String,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Title {
    #[serde(rename = "nodeType")]
    pub node_type: String,
    pub value: String,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct ManagedContentType {
    pub label: String,
    pub name: String,
    #[serde(rename = "nodeTypes")]
    pub node_types: HashMap<String, NodeTypeValue>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct NodeTypeValue {
    pub label: String,
    pub name: String,
    #[serde(rename = "nodeType")]
    pub node_type: NodeTypeEnum,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct AltText {
    pub label: String,
    pub name: String,
    #[serde(rename = "nodeType")]
    pub node_type: String,
}

// https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_managedcontenttype.htm
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub enum NodeTypeEnum {
    Date,
    DateTime,
    Media,
    MediaSource,
    MultilineText,
    NameField,
    RichText,
    Text,
    Url,
}
