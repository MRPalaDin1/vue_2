let app = new Vue({
    el: '#app',
    data() {
        return {
            columns: [
                { id: 1, title: 'Столбец1', cards: [] },
                { id: 2, title: 'Столбец2', cards: [] },
                { id: 3, title: 'Столбец3', cards: [] },
            ],
        };
    },
});