#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;
#[macro_use]
extern crate rocket_contrib;
extern crate rules;

mod processor;

use crate::processor::process;
use rocket_contrib::json::JsonValue;
use rules::types::Input;

#[post("/response?<a>&<b>&<c>&<d>&<e>&<f>")]
fn response(a: bool, b: bool, c: bool, d: f32, e: i32, f: i32) -> JsonValue {
    let input = Input { a, b, c, d, e, f };
    process(input)
}

fn main() {
    rocket::ignite().mount("/", routes![response]).launch();
}
