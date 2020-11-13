#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;
#[macro_use]
extern crate rocket_contrib;
extern crate rocket_cors;
extern crate rules;

mod processor;

use crate::processor::process;
use rocket::response::Responder;
// use rocket_contrib::json::JsonValue;
use rocket_cors::{AllowedOrigins, CorsOptions};
use rules::types::Input;

#[options("/response")]
fn reponse_options<'r>() -> impl Responder<'r> {
    let options = cors_options().to_cors()?;
    options.respond_owned(|guard| guard.responder(()))
}

#[post("/response?<a>&<b>&<c>&<d>&<e>&<f>")]
fn response<'r>(a: bool, b: bool, c: bool, d: f32, e: i32, f: i32) -> impl Responder<'r> {
    let input = Input { a, b, c, d, e, f };
    let response = process(input);

    let options = cors_options().to_cors()?;
    options.respond_owned(|guard| guard.responder(response))
}

fn cors_options() -> CorsOptions {
    let allowed_origins = AllowedOrigins::some_regex(&["^http://localhost:(.+)$"]);

    rocket_cors::CorsOptions {
        allowed_origins,
        ..Default::default()
    }
}

fn main() {
    rocket::ignite()
        .mount("/", routes![response, reponse_options])
        .manage(cors_options().to_cors().expect("To not fail"))
        .launch();
}
