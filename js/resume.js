/**
 * Попапы для открытия видео и фото.
 */
function open_popup (elem, coef = 2) {
    window.open(
        (elem.href) ? elem.href : elem.src,
        '',
        'width=' + (screen.availWidth / coef) + ', height=' + (screen.availHeight / coef) + ', top='
        + (screen.availHeight / coef / 2) + ', left=' + (screen.availWidth / coef / 2)
    );

    return false;
}

Vue.component('about-container', {
    props: ['item'],
    template: '<p v-if="item.html">{{ item.html }}</p>'
});

Vue.component('theory-container', {
    props: ['item'],
    template: '<p v-if="item.html">{{ item.html }}</p>'
});

Vue.component('articles-container', {
    props: ['item'],
    template: '' +
        '<li v-if="item.div && item.text" class="div">{{ item.text }}</li>' +
        '<li v-else-if="item.text">{{ item.text }}</li>'
});

Vue.component('bibliography-container', {
    props: [
        'item',
        'index',
    ],
    template: '' +
        '<li v-if="item.name">' +
        '    <div class="header">' +
        '        <h2>' +
        '            <span class="badge badge-light">' +
        '                {{ index }}.' +
        '            </span>' +
        '            {{ item.name }}' +
        '            <small>' +
        '                <strong>{{ item.authors }}</strong>' +
        '                <em class="ml-2">{{ item.description }}</em>' +
        '            </small>' +
        '        </h2>' +
        '    </div>' +
        '    <div class="body">' +
        '        <div v-if="item.images" v-for="image in item.images" class="images">' +
        '            <img :src="image" class="rounded" :alt="item.name">' +
        '        </div>' +
        '        <div v-if="item.paragraphs" v-for="paragraph in item.paragraphs" class="description">' +
        '            {{ paragraph }}' +
        '        </div>' +
        '        <div v-if="!item.paragraphs || item.paragraphs.length < 1" class="description">' +
        '            Описание отсутствует.' +
        '        </div>' +
        '    </div>' +
        '</li>'
});

Vue.component('photo-container', {
    props: ['item'],
    template: '' +
        '<div class="media"><img :src="item.src" onClick="open_popup(this, 1); return false;" :alt="item.alt"></div>'
});

const url_about = "/data/about.json";
const url_theory = "/data/theory.json";
const url_articles = "/data/articles.json";
const url_bibliography = "/data/bibliography.json";
const url_photo = "/data/photo.json";
const url_video = "/data/video.json";
const url_contacts = "/data/contacts.json";

var header = new Vue({
    el: '#header',
});

var main = new Vue({
    el: '#main',
    mounted() {
        axios.get(url_about).then(response => {
            this.about = response.data;
        });
        axios.get(url_theory).then(response => {
            this.theory = response.data;
        });
        axios.get(url_articles).then(response => {
            this.articles = response.data;
        });
        axios.get(url_bibliography).then(response => {
            this.bibliography = response.data;
            if (this.bibliography) {
                for (var i = 0; i < this.bibliography.length; i++) {
                    if (this.bibliography[i].images && this.bibliography[i].images.length > 0) {
                        for (var j = 0; j < this.bibliography[i].images.length; j++) {
                            this.bibliography[i].images[j] = '/images/sections/bibliography/' + this.bibliography[i].images[j];
                        }
                    }
                }
            }
        });
        axios.get(url_photo).then(response => {
            this.photo = response.data;
            if (this.photo) {
                for (var i = 0; i < this.photo.length; i++) {
                    if (this.photo[i].name && this.photo[i].name.length > 0) {
                        this.photo[i].src = '/images/sections/photo/' + this.photo[i].name + '.jpg';
                    }
                }
            }
        });
        axios.get(url_video).then(response => {
            this.video = response.data;
        });
        axios.get(url_contacts).then(response => {
            this.contacts = response.data;
        });
    },
    data: {
        about: [],
        theory: [],
        articles: [],
        bibliography: [],
        photo: [],
        video: [],
        contacts: [],
    }
});
