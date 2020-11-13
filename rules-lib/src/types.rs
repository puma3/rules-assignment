pub struct Input {
    pub a: bool,
    pub b: bool,
    pub c: bool,
    pub d: f32,
    pub e: i32,
    pub f: i32,
}

#[derive(Debug, PartialEq)]
pub enum HValue {
    M,
    P,
    T,
}

#[derive(Debug, PartialEq)]
pub struct Output {
    pub h: HValue,
    pub k: f32,
}
