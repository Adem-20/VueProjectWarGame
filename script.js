
function getRandomPoint(min,max){
    return Math.floor(Math.random() * (max-min)) + min;
}

const app = Vue.createApp({
    data(){
        return{
            winner: null,
            kullanici: 100,
            bilgisayar: 100,
            count: 0,
            btnHazir: true,
            canEkleTik: 0,
            alertKart: true,
        };
    },
    methods: {
        superSaldiriBtn(){
            if( this.count > 0 && this.count % 4 === 0) {
                this.btnHazir=false;
            }
        },
        bilgisayarAtak(){
            const attackPoint = getRandomPoint(10,20);
            this.kullanici = Math.max(this.kullanici - attackPoint, 0);
        },
        kullaniciAtak() {
            this.count++;
            const attackPoint = getRandomPoint(7,15);
            this.bilgisayar = Math.max(this.bilgisayar - attackPoint,0);
            this.bilgisayarAtak();
            this.superSaldiriBtn();

        },
        superSaldiri() {
            this.count++;
            const attackPoint = getRandomPoint(15,25);
            this.bilgisayar = Math.max(this.bilgisayar - attackPoint,0);
            this.bilgisayarAtak(); 
            this.btnHazir = true;
            this.superSaldiriBtn();
        },
        canEkle() {
            this.canEkleTik++;
            this.count++;
            if(this.canEkleTik <= 2){
            const kullaniciCan = getRandomPoint(16,18);
            const bilgisayarCan = getRandomPoint(14,18);
            this.kullanici= Math.min(kullaniciCan + this.kullanici,100)
            this.bilgisayar= Math.min(bilgisayarCan + this.bilgisayar,100)
            }else {
                this.superSaldiriBtn();
            }
        },
        yeniOyun(){
            this.bilgisayar = 100;
            this.kullanici = 100;
            this.winner = null;
            this.count=0;
            this.btnHazir = true; 
            this.canEkleTik= 0 ;
        },
     
    },
    computed: {
         bilgisayarBar() {
            const value = Math.min(this.bilgisayar, 100)          
            return { width: value + '%' };                       
        },
         kullaniciBar() {
            const value = Math.min(this.kullanici, 100);          
            return { width: value + '%' };                       
        },

    },
    watch: {
        kullanici(value) {
            if(value <= 0 && this.bilgisayar <= 0){
                this.winner = 'berabere';
            }else if(value > 0 && this.bilgisayar <=0){
                this.winner = 'kullanici'; 
            }
        },
        bilgisayar(value){
            if(value <= 0 && this.kullanici <= 0 ){
                this.winner='berabere'   
            }else if (value > 0 && this.kullanici <= 0) {
                this.winner='bilgisayar'
            }
        },
      
     
    },

});

app.mount('#app');