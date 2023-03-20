let app = Vue.createApp({
    data: function () {
        return {
            bannerId: 1,

            flowers: [{ name: 'roses', price: 100, check: false },
            { name: 'tulips', price: 200, check: false },
            { name: 'peonies', price: 300, check: false }],

            decor: [{ name: 'leaves', price: 50, check: false },
            { name: 'glitter', price: 60, check: false },
            { name: 'branches', price: 70, check: false }],
            flower_price: 0,
            amount: 0,
            name: '',
            email: '',
            decor_price: Vue.computed(() => this.decor.reduce(
                (acc, decor) =>
                    acc + (decor.check ? decor.price : 0), 0
            ))
        }
    },
    watch: {
        amount(newVal) {
           if (newVal < 0) this.amount = 0;
        }
    },
    methods: {
        changeBanner() {
            this.bannerId == 3 ? this.bannerId = 1 : this.bannerId++
        },
        modelStyle: function (image_url) {
            return {
                backgroundImage: "url(assets/img/" + image_url + ".jpg)"
            };
        },
        changeFlower(checkedFlower) {
            this.flowers.forEach((flower) => {
                flower === checkedFlower ? flower.check = true : flower.check = false;
            });
            this.flower_price = checkedFlower.price;
        }
    },
    mounted() {
        setInterval(this.changeBanner, 8000);
    },
    template: `
    <div class="app">
        <div class="app__inner">
            <div class="app__banner app__col" :style="modelStyle('banner-' + bannerId)"></div>
            <div class="calc app__col">
                <div class="calc__inner">
                    <form class="calc__form">
                        <div class="calc__title">
                            Bouquet calculator
                        </div>
                        <div class="calc__block">
                            <div class="calc__name">Flowers</div>
                            <div class="calc__check-block">
                                <label class="calc__check-label" v-for="(flower, i) in flowers" :key=i>
                                    <div class="calc__check-image" :style="modelStyle('flower-' + (i + 1))">
                                        <input type="radio" name="flowerRadio"
                                                            :value="flower.name"
                                                            :checked="flower.check"
                                                            @click="changeFlower(flower)" />
                                        <span class="calc__check"></span>

                                    </div>
                                    <div class="calc__check-name">{{flower.name}}</div>
                                </label>
                            </div>
                        </div>
                        <div class="calc__block">
                            <div class="calc__name">Decor</div>
                            <div class="calc__check-block">
                                <label class="calc__check-label" v-for="(dec, i) in decor" :key=i>
                                    <div class="calc__check-image" :style="modelStyle('dec-' + (i + 1))">
                                        <input type="checkbox"
                                               v-model="dec.check" />
                                        <span class="calc__check"></span>
                                    </div>
                                    <div class="calc__check-name">{{dec.name}}</div>
                                </label>
                            </div>
                        </div>
                        <div class="calc__block">
                            <input type="number" class="calc__amount calc__input-line"
                                    placeholder="Enter number of flowers"
                                    v-model="amount">
                        </div>
                        <div class="calc__block calc__block_price">
                            <div class="calc__name calc__name_price">Price</div>
                            <div class="calc__price">\${{ (decor_price + flower_price) * amount }}</div>
                        </div>
                        <div class="calc__block">
                            <input type="text" class="calc__input-line" placeholder="Your name" v-model="name">
                        </div>
                        <div class="calc__block">
                            <input type="text" class="calc__input-line" placeholder="Your email" v-model="email">
                        </div>
                        <div class="calc__submit">
                            <input type="submit" class="calc__input-sub" value="Get a bouquet!">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    `
})

app.mount('#root')