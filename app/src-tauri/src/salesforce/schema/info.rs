use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Info {
    #[serde(rename = "aboutMe")]
    pub about_me: Option<serde_json::Value>,
    #[serde(rename = "additionalLabel")]
    pub additional_label: Option<serde_json::Value>,
    pub address: Address,
    #[serde(rename = "bannerPhoto")]
    pub banner_photo: BannerPhoto,
    #[serde(rename = "chatterActivity")]
    pub chatter_activity: ChatterActivity,
    #[serde(rename = "chatterInfluence")]
    pub chatter_influence: ChatterInfluence,
    #[serde(rename = "communityNickname")]
    pub community_nickname: String,
    #[serde(rename = "companyName")]
    pub company_name: String,
    #[serde(rename = "displayName")]
    pub display_name: String,
    pub email: String,
    #[serde(rename = "firstName")]
    pub first_name: String,
    #[serde(rename = "followersCount")]
    pub followers_count: i64,
    #[serde(rename = "followingCounts")]
    pub following_counts: FollowingCounts,
    #[serde(rename = "groupCount")]
    pub group_count: i64,
    #[serde(rename = "hasChatter")]
    pub has_chatter: bool,
    pub id: String,
    #[serde(rename = "isActive")]
    pub is_active: bool,
    #[serde(rename = "isInThisCommunity")]
    pub is_in_this_community: bool,
    #[serde(rename = "lastName")]
    pub last_name: String,
    #[serde(rename = "managerId")]
    pub manager_id: Option<serde_json::Value>,
    #[serde(rename = "managerName")]
    pub manager_name: Option<serde_json::Value>,
    pub motif: Motif,
    #[serde(rename = "mySubscription")]
    pub my_subscription: Option<serde_json::Value>,
    pub name: String,
    #[serde(rename = "outOfOffice")]
    pub out_of_office: OutOfOffice,
    #[serde(rename = "phoneNumbers")]
    pub phone_numbers: Vec<Option<serde_json::Value>>,
    pub photo: Photo,
    pub reputation: Option<serde_json::Value>,
    #[serde(rename = "thanksReceived")]
    pub thanks_received: i64,
    pub title: Option<serde_json::Value>,
    #[serde(rename = "type")]
    pub welcome_type: String,
    pub url: String,
    #[serde(rename = "userType")]
    pub user_type: String,
    pub username: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Address {
    pub city: Option<serde_json::Value>,
    pub country: String,
    #[serde(rename = "formattedAddress")]
    pub formatted_address: String,
    pub state: Option<serde_json::Value>,
    pub street: Option<serde_json::Value>,
    pub zip: Option<serde_json::Value>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct BannerPhoto {
    #[serde(rename = "bannerPhotoUrl")]
    pub banner_photo_url: String,
    #[serde(rename = "bannerPhotoVersionId")]
    pub banner_photo_version_id: String,
    pub url: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ChatterActivity {
    #[serde(rename = "commentCount")]
    pub comment_count: i64,
    #[serde(rename = "commentReceivedCount")]
    pub comment_received_count: i64,
    #[serde(rename = "likeReceivedCount")]
    pub like_received_count: i64,
    #[serde(rename = "postCount")]
    pub post_count: i64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ChatterInfluence {
    pub percentile: String,
    pub rank: i64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FollowingCounts {
    pub people: i64,
    pub records: i64,
    pub total: i64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Motif {
    pub color: String,
    #[serde(rename = "largeIconUrl")]
    pub large_icon_url: String,
    #[serde(rename = "mediumIconUrl")]
    pub medium_icon_url: String,
    #[serde(rename = "smallIconUrl")]
    pub small_icon_url: String,
    #[serde(rename = "svgIconUrl")]
    pub svg_icon_url: Option<serde_json::Value>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct OutOfOffice {
    pub message: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Photo {
    #[serde(rename = "fullEmailPhotoUrl")]
    pub full_email_photo_url: String,
    #[serde(rename = "largePhotoUrl")]
    pub large_photo_url: String,
    #[serde(rename = "mediumPhotoUrl")]
    pub medium_photo_url: String,
    #[serde(rename = "photoVersionId")]
    pub photo_version_id: String,
    #[serde(rename = "smallPhotoUrl")]
    pub small_photo_url: String,
    #[serde(rename = "standardEmailPhotoUrl")]
    pub standard_email_photo_url: String,
    pub url: String,
}
