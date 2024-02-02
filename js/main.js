let app = new Vue({
    el: '#app',
    data() {
        return {
            columns: [
                { id: 1, title: 'Столбец1', cards: [] },
                { id: 2, title: 'Столбец2', cards: [] },
                { id: 3, title: 'Столбец3', cards: [] },
            ],
            column1Locked: false,
        };
    },
    methods: {
        addCard(column) {
            if (!this.column1Locked && column.cards.length < this.getMaxCards(column.id)) {
                const newCard = { title: 'Новая карточка', items: [], columnId: column.id };
                column.cards.push(newCard);

                if (column.id === 1) {
                    const completedCount = newCard.items.filter(item => item.completed).length;
                    const totalCount = newCard.items.length;
                    if (completedCount / totalCount > 0.5 && this.columns[1].cards.length < this.getMaxCards(2)) {
                        this.moveCard(newCard, 1, 2);
                    }
                }
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
        moveCard(card, fromColumnId, toColumnId) {
            const fromColumn = this.columns.find(column => column.id === fromColumnId);
            const toColumn = this.columns.find(column => column.id === toColumnId);
            const index = fromColumn.cards.indexOf(card);
            if (index !== -1) {
                fromColumn.cards.splice(index, 1);
                card.columnId = toColumnId;
                toColumn.cards.push(card);
            }
        },
        moveCardIfCompleted(card) {
            if (card.columnId === 1) {
                const completedCount = card.items.filter(item => item.completed).length;
                const totalCount = card.items.length;
                if (completedCount / totalCount > 0.5 && this.columns[1].cards.length < this.getMaxCards(2)) {
                    this.moveCard(card, 1, 2);
                }
                if (completedCount === totalCount) {
                    this.moveCard(card, 1, 3);
                    card.completedAt = new Date().toLocaleString();
                }
            } else if (card.columnId === 2) {
                const completedCount = card.items.filter(item => item.completed).length;
                const totalCount = card.items.length;
                if (completedCount === totalCount) {
                    this.moveCard(card, 2, 3);
                    card.completedAt = new Date().toLocaleString();
                }
            }
        },
        isCardLocked(card) {
            if (card.columnId === 1 && this.columns[1].cards.length === this.getMaxCards(2)) {
                const completedCount = card.items.filter(item => item.completed).length;
                const totalCount = card.items.length;
                return completedCount / totalCount > 0.5;
            }
            return false;
        },
    },
});