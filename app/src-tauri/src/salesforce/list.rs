use std::{env,fs};
use regex::Regex;

use super::schema::org::Org;

const PATH_VAR: &str = "HOMEPATH";
const STATE_FOLDER: &str = ".sfdx";

pub async fn run() -> Result<Vec<Org>, Box<dyn std::error::Error>> {
  // TODO: extra checks for errors here

  // regex to check for valid json files
  let auth_file_name_regex = Regex::new(r"^[^.][^@]*@[^.]+(\.[^.\s]+)+\.json$").unwrap();

  let home_path = env::var(PATH_VAR).ok();
  let path_to_sfdx: &str = &format!("{}\\{}", home_path.unwrap(), STATE_FOLDER);

  let mut list_of_orgs: Vec<Org> = vec![];

  for entry_res in fs::read_dir(path_to_sfdx).unwrap() {
    let entry = entry_res.unwrap();
    let file_name_buf = entry.file_name();
    let file_name = file_name_buf.to_str().unwrap();
    
    // check valid auth file
    if auth_file_name_regex.is_match(&file_name) {
      let path_to_file = format!("{}\\{}", path_to_sfdx, file_name);
      let file_contents_as_string: String = get_file(&path_to_file);

      let org_data: Org = serde_json::from_str(file_contents_as_string.as_str()).unwrap();
      list_of_orgs.push(org_data);
    }
  }
  
  Ok(list_of_orgs)
}

fn get_file(file_path: &str) -> String {
  let contents = fs::read_to_string(file_path)
    .expect("Something went wrong reading the file");
  return contents;
}