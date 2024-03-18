using Entities;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new();
        public string PaymentIntentId { get; set; }
        public string ClientSecret { get; set; }
        public void AddItem(Product product, int quantity = 1)
        {
            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);

            if (existingItem == null)
            {
                Items.Add(new BasketItem
                {
                    Product = product,
                    Quantity = quantity
                });
            }
            else
            {
                existingItem.Quantity += quantity;
            }
        }

        public void RemoveItem(int productId, int quantity = 1)
        {
            var existingItem = Items.FirstOrDefault(item => item.ProductId == productId);
            if (existingItem == null) return;

            if (existingItem.Quantity > quantity)
            {
                existingItem.Quantity -= quantity;
            }
            else
            {
                Items.Remove(existingItem);
            }
        }
    }
}