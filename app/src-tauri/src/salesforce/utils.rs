use directories::ProjectDirs;

pub fn data_dir() -> String {
    let project_dir = ProjectDirs::from("com", "sf-trekken", "app").unwrap();
    project_dir.data_dir().to_str().unwrap().to_string()
}

pub fn norm(path: &str) -> String {
    str::replace(path, "\\", "/")
}
