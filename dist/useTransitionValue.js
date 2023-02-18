"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTransitionValue = exports.default = void 0;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// from https://easings.net/de#easeOutBack
function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

var useTransitionValue = function useTransitionValue() {
  var from = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var options // options are ... optional
  = arguments.length > 1 ? arguments[1] : undefined;

  var settings = _objectSpread(_objectSpread({}, {
    // default options
    from: from,
    to: 100,
    duration: 200,
    autoStart: false,
    easing: easeOutExpo,
    onDone: function onDone(args) {},
    onStep: function onStep(args) {}
  }), options);

  var _useState = (0, _react.useState)(settings.from),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var animationFrame = (0, _react.useRef)();
  var startTime = (0, _react.useRef)();
  var currentValue = (0, _react.useRef)(from);
  var currentTo = (0, _react.useRef)(settings.to);
  var start = (0, _react.useCallback)(function () {
    var to = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : settings.to;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$from = _ref.from,
        from = _ref$from === void 0 ? currentValue.current : _ref$from,
        _ref$duration = _ref.duration,
        duration = _ref$duration === void 0 ? settings.duration : _ref$duration,
        _ref$easing = _ref.easing,
        easing = _ref$easing === void 0 ? settings.easing : _ref$easing,
        _ref$onDone = _ref.onDone,
        onDone = _ref$onDone === void 0 ? function () {} : _ref$onDone,
        _ref$onStep = _ref.onStep,
        onStep = _ref$onStep === void 0 ? function () {} : _ref$onStep;

    if (typeof to !== "number") {
      throw new Error("please supply a 'to' value");
    }

    var loop = function loop() {
      animationFrame.current = requestAnimationFrame(onFrame);
    };

    var onFrame = function onFrame() {
      // time elapsed since start of transition
      var elapsed = Date.now() - startTime.current; // total distance between start and target value

      var distance = to - from; // distance traveled so far between start and target value

      var traveled = distance / duration * elapsed; // percentage traveled so far

      var percentage = 100 / distance * traveled; // factor (between 0 - 1) traveled so far

      var factor = percentage / 100; // elapsed may be greater than duration which can happen if animationFrame/loop 'overshoots' duration time (it fires async after all)

      var isFinished = elapsed >= duration;
      var newEasedValue = isFinished ? to : from + easing(factor) * distance;
      currentValue.current = newEasedValue;
      setValue(newEasedValue);
      currentTo.current = to;
      var onStepArgs = {
        from: from,
        to: to,
        value: newEasedValue
      };
      settings.onStep(onStepArgs);
      onStep(onStepArgs);

      if (isFinished) {
        var ondoneArgs = {
          from: from,
          to: to,
          value: newEasedValue
        };
        settings.onDone(ondoneArgs);
        onDone(ondoneArgs);
      } else {
        loop();
      }
    };

    if (animationFrame.current) cancelAnimationFrame(animationFrame.current); // dont start loop if allready at target value (would cause distance equaling 0 and by 0 division error)

    if (from === to) return;
    startTime.current = Date.now();
    loop();
  }, [settings.duration, settings.easing, settings.onDone, settings.onStep, settings.to]); // const pauseTime = useRef<number>()

  var pause = (0, _react.useCallback)(function () {
    if (animationFrame.current) {
      // pauseTime.current = Date.now()
      cancelAnimationFrame(animationFrame.current);
    }
  }, []);
  var resume = (0, _react.useCallback)(function (options) {
    // if (pauseTime.current && startTime.current) {
    // const restDuration = pauseTime.current - startTime.current
    start(currentTo.current, options); // }
  }, []);
  (0, _react.useEffect)(function () {
    if (settings.autoStart) {
      start();
    }
  }, [settings.autoStart]);
  (0, _react.useEffect)(function () {
    return function () {
      // TODO: fix animationFrame.current! wokraround
      cancelAnimationFrame(animationFrame.current);
    };
  }, []);
  return [value, start, {
    pause: pause,
    resume: resume
  }];
};

exports.useTransitionValue = useTransitionValue;
var _default = useTransitionValue;
exports.default = _default;
