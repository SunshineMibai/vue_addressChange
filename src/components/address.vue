<template>
	<div class='component-address'>
        <p @click='pickerShow=true' v-if='codes.changeActive === true' style='color:#000;'>{{codes.province + codes.city + codes.county}}</p>
		<p @click='pickerShow=true'  v-if='codes.changeActive === false' style='color: #666;margin-right:5px;'>
			请选择
		</p>
		<mt-popup v-model="pickerShow" position="bottom">
            <div class='pieker-title'>
                <button class='bg-blue' @click='closePicker(1)'>取消</button>
				<button class='bg-blue' @click='closePicker(2)'>确定</button>
            </div>
			<mt-picker :slots="slots" value-key="name" @change="onValuesChange">
			</mt-picker>
		</mt-popup>
	</div>
</template>
<script>
import Address from "@/utils/address.json";
export default {
  props: {
    codes: {
      type: Object,
      default: {
        province: "",
        city: "",
        county: "",
        changeActive: false
      }
    },
    type: {
      type: String,
      default: "text"
    }
  },
  data() {
    return {
      pickerShow: false,
      codeList: [],
      slots: [
        {
          flex: 1,
          values: Address,
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot2"
        },
        {
          flex: 1,
          values: Address[0].children,
          className: "slot3",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot4"
        },
        {
          flex: 1,
          values: Address[0].children[0].children,
          className: "slot5",
          textAlign: "center"
        }
      ]
    };
  },
  methods: {
    closePicker(type) {
      this.pickerShow = false;
      let codes =
        type === 1
          ? { province: "", city: "", county: "", changeActive: false }
          : this.codes;
      this.codes.changeActive = type === 1 ? false : true;
      this.$emit("getAddress", codes);
    },
    onValuesChange(picker, values) {
      if (this.type == "text") {
        this.codes.province = values[0].name;
        this.codes.city = values[1].name;
        this.codes.county = values[2].name;
      } else if (this.type == "code") {
        this.codes.province = values[0].code;
        this.codes.city = values[1].code;
        this.codes.county = values[2].code;
      }
      if (!values[0]) {
        this.$nextTick(() => {
          picker.setValues([
            values[0],
            values[0].children[0],
            values[0].children[0].children[0]
          ]);
        });
      } else {
        picker.setSlotValues(1, values[0].children);
        let town = [];
        if (values[1]) {
          town = values[1].children;
        }
        picker.setSlotValues(2, town);
      }
    }
  }
};
</script>
<style>
.component-address > p {
  font-size: 0.8rem;
}
.component-address .mint-popup,
.component-address .picker {
  width: 100%;
}

.component-address .pieker-title > button:first-child {
  border-right: 1px solid #fff;
}
.component-address .pieker-title > button {
  width: 50%;
  height: 35px;
  border: none;
  font-size: 0.8rem;
  color: #fff;
}
.component-address .bg-blue{
  background: #26A2ff!important;
  color: #fff;
}
.component-address .picker-item{
  font-size: .9rem;
}
</style>