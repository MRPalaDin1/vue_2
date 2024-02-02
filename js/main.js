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
    methods: {
        addCard(column) {
            if (column.cards.length < this.getMaxCards(column.id)) {
                const newCard = { title: 'Новая карточка', items: [] };
                column.cards.push(newCard);
                this.saveToLocalStorage();
            }
        },
        removeCard(column, card) {
            const index = column.cards.indexOf(card);
            if (index !== -1) {
                column.cards.splice(index, 1);
            }
        },
        getMaxCards(columnId) {
            if (columnId === 1) return 3;
            if (columnId === 2) return 5;
            return Infinity;
        },
        addItem(card) {
            if (card.items.length < 5) {
                card.items.push({ text: 'Новый пункт', completed: false });
            }
        },
        removeItem(card, itemIndex) {
            card.items.splice(itemIndex, 1);
        },
    },
});