use rocket_contrib::json::JsonValue;
use rules::types::{HValue, Input, Output};

pub fn process(input: Input) -> JsonValue {
    match rules::result(input) {
        Ok(Output { h, k }) => {
            let h_str = match h {
                HValue::M => "M",
                HValue::P => "P",
                HValue::T => "T",
            };
            json!({ "h": h_str, "k": k})
        }
        Err(message) => json!({ "error": message }),
    }
}
