"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-divider",
  props: {
    // 单一边divider横线的宽度(数值)，单位rpx。或者百分比
    halfWidth: {
      type: [Number, String],
      default: 150
    },
    // divider横线的颜色，如设置，
    borderColor: {
      type: String,
      default: "#dcdfe6"
    },
    // 主题色，可以是primary|info|success|warning|error之一值
    type: {
      type: String,
      default: "primary"
    },
    // 文字颜色
    color: {
      type: String,
      default: "#909399"
    },
    // 文字大小，单位rpx
    fontSize: {
      type: [Number, String],
      default: 26
    },
    // 整个divider的背景颜色
    bgColor: {
      type: String,
      default: "#ffffff"
    },
    // 整个divider的高度单位rpx
    height: {
      type: [Number, String],
      default: "auto"
    },
    // 上边距
    marginTop: {
      type: [String, Number],
      default: 0
    },
    // 下边距
    marginBottom: {
      type: [String, Number],
      default: 0
    },
    // 是否使用slot传入内容，如果不用slot传入内容，先的中间就不会有空隙
    useSlot: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    lineStyle() {
      let style = {};
      if (String(this.halfWidth).indexOf("%") != -1)
        style.width = this.halfWidth;
      else
        style.width = this.halfWidth + "rpx";
      if (this.borderColor)
        style.borderColor = this.borderColor;
      return style;
    }
  },
  methods: {
    click() {
      this.$emit("click");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.n($props.type ? "u-divider-line--bordercolor--" + $props.type : ""),
    b: common_vendor.s($options.lineStyle),
    c: $props.useSlot
  }, $props.useSlot ? {
    d: $props.color,
    e: $props.fontSize + "rpx"
  } : {}, {
    f: common_vendor.n($props.type ? "u-divider-line--bordercolor--" + $props.type : ""),
    g: common_vendor.s($options.lineStyle),
    h: $props.height == "auto" ? "auto" : $props.height + "rpx",
    i: $props.bgColor,
    j: $props.marginBottom + "rpx",
    k: $props.marginTop + "rpx",
    l: common_vendor.o((...args) => $options.click && $options.click(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3f2f4c00"], ["__file", "D:/文件/软工/ershouFinal/ershouFinal/shop-pro/src/uni_modules/vk-uview-ui/components/u-divider/u-divider.vue"]]);
wx.createComponent(Component);
