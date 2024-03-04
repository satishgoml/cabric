import { g, u as v, p as b } from "./index-WzD6lkW-.js";
import O from "react";
function V(t, e) {
  for (var r = 0; r < e.length; r++) {
    const o = e[r];
    if (typeof o != "string" && !Array.isArray(o)) {
      for (const a in o)
        if (a !== "default" && !(a in t)) {
          const n = Object.getOwnPropertyDescriptor(o, a);
          n && Object.defineProperty(t, a, n.get ? n : {
            enumerable: !0,
            get: () => o[a]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }));
}
var D = Object.create, i = Object.defineProperty, j = Object.getOwnPropertyDescriptor, w = Object.getOwnPropertyNames, S = Object.getPrototypeOf, M = Object.prototype.hasOwnProperty, A = (t, e, r) => e in t ? i(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, L = (t, e) => {
  for (var r in e)
    i(t, r, { get: e[r], enumerable: !0 });
}, h = (t, e, r, o) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let a of w(e))
      !M.call(t, a) && a !== r && i(t, a, { get: () => e[a], enumerable: !(o = j(e, a)) || o.enumerable });
  return t;
}, R = (t, e, r) => (r = t != null ? D(S(t)) : {}, h(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  e || !t || !t.__esModule ? i(r, "default", { value: t, enumerable: !0 }) : r,
  t
)), E = (t) => h(i({}, "__esModule", { value: !0 }), t), s = (t, e, r) => (A(t, typeof e != "symbol" ? e + "" : e, r), r), _ = {};
L(_, {
  default: () => y
});
var f = E(_), c = R(O), d = v, P = b;
const C = "https://play.vidyard.com/embed/v4.js", x = "VidyardV4", N = "onVidyardAPI";
class y extends c.Component {
  constructor() {
    super(...arguments), s(this, "callPlayer", d.callPlayer), s(this, "mute", () => {
      this.setVolume(0);
    }), s(this, "unmute", () => {
      this.props.volume !== null && this.setVolume(this.props.volume);
    }), s(this, "ref", (e) => {
      this.container = e;
    });
  }
  componentDidMount() {
    this.props.onMount && this.props.onMount(this);
  }
  load(e) {
    const { playing: r, config: o, onError: a, onDuration: n } = this.props, l = e && e.match(P.MATCH_URL_VIDYARD)[1];
    this.player && this.stop(), (0, d.getSDK)(C, x, N).then((p) => {
      this.container && (p.api.addReadyListener((u, m) => {
        this.player || (this.player = m, this.player.on("ready", this.props.onReady), this.player.on("play", this.props.onPlay), this.player.on("pause", this.props.onPause), this.player.on("seek", this.props.onSeek), this.player.on("playerComplete", this.props.onEnded));
      }, l), p.api.renderPlayer({
        uuid: l,
        container: this.container,
        autoplay: r ? 1 : 0,
        ...o.options
      }), p.api.getPlayerMetadata(l).then((u) => {
        this.duration = u.length_in_seconds, n(u.length_in_seconds);
      }));
    }, a);
  }
  play() {
    this.callPlayer("play");
  }
  pause() {
    this.callPlayer("pause");
  }
  stop() {
    window.VidyardV4.api.destroyPlayer(this.player);
  }
  seekTo(e, r = !0) {
    this.callPlayer("seek", e), r || this.pause();
  }
  setVolume(e) {
    this.callPlayer("setVolume", e);
  }
  setPlaybackRate(e) {
    this.callPlayer("setPlaybackSpeed", e);
  }
  getDuration() {
    return this.duration;
  }
  getCurrentTime() {
    return this.callPlayer("currentTime");
  }
  getSecondsLoaded() {
    return null;
  }
  render() {
    const { display: e } = this.props, r = {
      width: "100%",
      height: "100%",
      display: e
    };
    return /* @__PURE__ */ c.default.createElement("div", { style: r }, /* @__PURE__ */ c.default.createElement("div", { ref: this.ref }));
  }
}
s(y, "displayName", "Vidyard");
s(y, "canPlay", P.canPlay.vidyard);
const T = /* @__PURE__ */ g(f), B = /* @__PURE__ */ V({
  __proto__: null,
  default: T
}, [f]);
export {
  B as V
};
