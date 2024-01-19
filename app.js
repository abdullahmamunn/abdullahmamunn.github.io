
const { createApp, ref } = Vue

var app = Vue.createApp({
    data(){
      return {
          name: '',
          mobile: '',
          appliedCoupon: null,
          couponCode: "",
          defaultMobileLength: "",
          coupons: [
              {
                  code: "100TAKAOFF",
                  discount: 100
              },
              {
                  code: "200TAKAOFF",
                  discount: 200
              }
          ],
          seatStates: {
              sold: {
                  text: "Sold",
                  color: "#ff0000"
              },
              available: {
                  text: "Available",
                  color: "#fff"
              },
              booked: {
                  text: "Booked",
                  color: "gray"
              },
              selected: {
                  text: "Selected",
                  color: "#00ff00"
              }
          },
          seats: [
              {
                  name: "A1",
                  type: "available",
                  price: 500
              },
              {
                  name: "A2",
                  type: "available",
                  price: 500
              },
              {
                  name: "A3",
                  type: "available",
                  price: 500
              },
              {
                  name: "A4",
                  type: "available",
                  price: 500
              },
              {
                  name: "B1",
                  type: "available",
                  price: 450
              },
              {
                  name: "B2",
                  type: "available",
                  price: 450
              },
              {
                  name: "B3",
                  type: "available",
                  price: 450
              },
              {
                  name: "B4",
                  type: "available",
                  price: 450
              },
              {
                  name: "C1",
                  type: "sold",
                  price: 500
              },
              {
                  name: "C2",
                  type: "sold",
                  price: 500
              },
              {
                  name: "C3",
                  type: "sold",
                  price: 500
              },
              {
                  name: "C4",
                  type: "sold",
                  price: 500
              },
              {
                  name: "D1",
                  type: "available",
                  price: 400
              },
              {
                  name: "D2",
                  type: "available",
                  price: 400
              },
              {
                  name: "D3",
                  type: "available",
                  price: 400
              },
              {
                  name: "D4",
                  type: "available",
                  price: 400
              },
              {
                  name: "E1",
                  type: "available",
                  price: 300
              },
              {
                  name: "E2",
                  type: "available",
                  price: 300
              },
              {
                  name: "E3",
                  type: "booked",
                  price: 300
              },
              {
                  name: "E4",
                  type: "booked",
                  price: 300
              },
              {
                  name: "F1",
                  type: "available",
                  price: 300
              },
              {
                  name: "F2",
                  type: "available",
                  price: 300
              },
              {
                  name: "F3",
                  type: "available",
                  price: 300
              },
              {
                  name: "F4",
                  type: "available",
                  price: 300
              }
          ],

          confirmed: false


      }
    },

    computed:{
        selectedSeats() {
            let sc = this.seats.filter((item) => item.type === "selected");
            return sc;
        },

        totalCost() {
            let tc = 0;
            this.selectedSeats.forEach((seat) => {
               tc = tc + seat.price;
            });

            if(this.appliedCoupon !== null) {
                tc = tc - this.appliedCoupon.discount;
            }

            return tc;
        }
    },

    methods: {
        handleClick(index) {
            let clickedSeat = this.seats[index];

            if(clickedSeat.type === "sold" || clickedSeat.type === "booked") {
                alert('You cannot select this seat');
                    return;
            }

            if(this.selectedSeats.length > 2) {
                alert('You cant select more than 3 seats');
                return;
            }

            clickedSeat.type = clickedSeat.type === "selected" ? 'available' : "selected";

        },

        confirm() {
            if (!this.name || !this.mobile) {
                console.log(this.mobile.length);
                if(this.mobile.length > 11) {
                    alert('Mobile number cant be greater than 11');
                }
                alert("Please enter name and mobile");
            }

            console.log(this.confirmed = true);
        },

        resetData() {
            this.confirmed = false;
            this.name = "";
            this.mobile = "";
            this.appliedCoupon = null;

            this.seats.forEach((seat) => {
                if (seat.type === "selected") {
                    seat.type = "sold";
                }
            });
        }

    },

    watch: {
        couponCode(newValue) {
            if(newValue.length === 10) {
                let searchCoupon = this.coupons.filter((value) => value.code === newValue);
                if(searchCoupon.length === 1) {
                    this.appliedCoupon = searchCoupon[0];
                    this.couponCode = '';
                } else {
                    alert("Coupon not valid")
                    return;
                }
            }

        },

        defaultMobileLength(newValue)
        {
            console.log(newValue);
        }
    }

});

app.mount("#app");
