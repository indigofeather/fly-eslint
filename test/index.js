const test = require("tape").test
const join = require("path").join
const fly = {}
const state = {
  pass: {
    msg: "pass lint",
    spec: [join("test", "fixtures", "pass.js")]
  },
  fail: {
    msg: "fail lint",
    spec: [join("test", "fixtures", "fail.js")]
  }
}
const unwrap = function (f) { return f(this.spec) }

test("fly-eslint", function (t) {
  require("../").call(fly)
  t.ok(fly.eslint !== undefined, "inject eslint in fly instance")
  run.call(fly, t, state.pass, true)
  run.call(fly, t, state.fail, false)
  t.end()
})

function run (t, state, pass) {
  try {
    this.unwrap = unwrap.bind(state)
    this.eslint()
    t.ok(pass, state.msg)
  } catch (e) {
    t.ok(!pass, state.msg)
  }
}
