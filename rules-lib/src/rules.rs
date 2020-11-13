// use std::io;
use crate::errors;
use crate::types::*;

fn base_h_value(a: bool, b: bool, c: bool) -> Result<HValue, &'static str> {
    if a && b && !c {
        Ok(HValue::M)
    } else if a && b && c {
        Ok(HValue::P)
    } else if !a && b && c {
        Ok(HValue::T)
    } else {
        Err(errors::INVALID_INPUT)
    }
}

fn base_k_value(h: &HValue, d: f32, e: i32, f: i32) -> f32 {
    match h {
        HValue::M => d + (d * (e as f32) / 10.0),
        HValue::P => d + (d * (e - f) as f32 / 25.5),
        HValue::T => d - (d * (f as f32) / 30.0),
    }
}

fn custom_1_k_value(h: &HValue, d: f32, e: i32, _f: i32) -> Option<f32> {
    match *h {
        HValue::P => Some(2.0 * d + (d * (e as f32) / 100.0)),
        _ => None,
    }
}

fn custom_2_h_value(a: bool, b: bool, c: bool) -> Option<HValue> {
    if a && b && !c {
        Some(HValue::T)
    } else if a && !b && c {
        Some(HValue::M)
    } else {
        None
    }
}

fn custom_2_k_value(h: &HValue, d: f32, e: i32, f: i32) -> Option<f32> {
    match *h {
        HValue::M => Some(f as f32 + d + (d * (e as f32) / 100.0)),
        _ => None,
    }
}

pub fn result(input: Input) -> Result<Output, &'static str> {
    // Custom 2 has higher priority than base rules to retrieve H value
    let h_value = if let Some(custom_2_h_value) = custom_2_h_value(input.a, input.b, input.c) {
        custom_2_h_value
    } else {
        base_h_value(input.a, input.b, input.c)?
    };

    // Calls to functions to get K value are performed priority-wise
    let k_value = if let Some(custom_2_k_value) =
        custom_2_k_value(&h_value, input.d, input.e, input.f)
    {
        custom_2_k_value
    } else if let Some(custom_1_k_value) = custom_1_k_value(&h_value, input.d, input.e, input.f) {
        custom_1_k_value
    } else {
        base_k_value(&h_value, input.d, input.e, input.f)
    };

    Ok(Output {
        h: h_value,
        k: k_value,
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_base_h_value() {
        assert_eq!(base_h_value(true, true, false), Ok(HValue::M));
        assert_eq!(base_h_value(true, true, true), Ok(HValue::P));
        assert_eq!(base_h_value(false, true, true), Ok(HValue::T));
        assert_eq!(base_h_value(true, false, false), Err(errors::INVALID_INPUT));
        assert_eq!(base_h_value(true, false, true), Err(errors::INVALID_INPUT));
        assert_eq!(base_h_value(false, false, true), Err(errors::INVALID_INPUT));
        assert_eq!(base_h_value(false, true, false), Err(errors::INVALID_INPUT));
        assert_eq!(base_h_value(false, false, true), Err(errors::INVALID_INPUT));
        assert_eq!(
            base_h_value(false, false, false),
            Err(errors::INVALID_INPUT)
        );
    }

    #[test]
    fn test_base_k_value() {
        assert_eq!(base_k_value(&HValue::M, 0.0, 0, 0), 0.0);
        assert_eq!(base_k_value(&HValue::P, 0.0, 0, 0), 0.0);
        assert_eq!(base_k_value(&HValue::T, 0.0, 0, 0), 0.0);

        assert_eq!(base_k_value(&HValue::M, 1.0, 1, 1), 1.1);
        assert_eq!(base_k_value(&HValue::P, 1.0, 1, 1), 1.0);
        assert_eq!(base_k_value(&HValue::T, 1.0, 1, 1), 1.0 - (1.0 / 30.0));

        assert_eq!(base_k_value(&HValue::M, -10.0, -4, -1), -6.0);
        assert_eq!(
            base_k_value(&HValue::P, -10.0, -4, -1),
            -10.0 + (30.0 / 25.5)
        );
        assert_eq!(base_k_value(&HValue::T, -10.0, -4, -1), -10.0 - (1.0 / 3.0));

        assert_eq!(base_k_value(&HValue::M, 12.25, 3, 10), 15.925);
        assert_eq!(
            base_k_value(&HValue::P, 12.25, 3, 10),
            12.25 + (-85.75 / 25.5)
        );
        assert_eq!(
            base_k_value(&HValue::T, 12.25, 3, 10),
            12.25 - (12.25 / 3.0)
        );

        // assert_eq!(
        //     base_k_value(&HValue::M, 9999999.999999, 99999999, 99999),

        // );
        // assert_eq!(
        //     base_k_value(&HValue::P, 9999999.999999, 99999999, 99999),
        //     15.925
        // );
        // assert_eq!(
        //     base_k_value(&HValue::T, 9999999.999999, 99999999, 99999),
        //     15.925
        // );
    }
}
