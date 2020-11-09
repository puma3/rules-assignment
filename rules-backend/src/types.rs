pub struct Input {
    pub a: bool,
    pub b: bool,
    pub c: bool,
    pub d: f32,
    pub e: i32,
    pub f: i32,
}

pub enum HValue {
    M,
    P,
    T,
}

pub struct Output {
    pub h: HValue,
    pub k: f32,
}
