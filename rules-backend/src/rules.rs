// use std::io;
use crate::types::*;
use HValue::*;

fn h_value(a: bool, b: bool, c: bool) -> Result<HValue, &'static str> {
    if a && b && !c {
        Ok(M)
    } else if a && b && c {
        Ok(P)
    } else if !a && b && c {
        Ok(T)
    } else {
        Err("Error")
    }
}

fn k_value(h: HValue, d: f32, e: i32, f: i32) -> f32 {}

pub fn result(input: Input) -> Option<Output> {
    let h_value = h_value(input.a, input.b, input.c);

    None
}
