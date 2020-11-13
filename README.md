# Rules Assignment

### Structure

The repository is composed of three folders: `rules-lib`, `rules-server` and `rules-client` containing the code for the rules logic, server and web client respectively.

### Execution

> Note that the nightly toolchain of Rust is required to compile `rules-server`.

In a terminal instance execute:

```bash
cd rules-server
cargo +nightly run
```

In a different terminal instance execute:

```bash
cd rules-client
yarn install
yarn start
```

Navigate to [http://localhost:3000/](http://localhost:3000/), you should see a page similar to the animation below. Change the values and test the responses.

### Unit testing

Unit testing was implemented for `rules-lib` only and the tests are present in `src/rules.rs`. To execute them type or paste the following commands:

```bash
cd rules-lib
cargo test
```
