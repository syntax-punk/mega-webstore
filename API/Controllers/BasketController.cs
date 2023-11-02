using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<Basket>> GetBasket()
        {
            var basket = await RetrieveBasket();
            if (basket == null) return NotFound();

            return basket;
        }

        [HttpPost]
        public async Task<ActionResult> AddItemToBasket(int productId, int quantity) 
        {
            var basket = await RetrieveBasket();
            if (basket == null) 
            {
                basket = CreateBasket();
            }
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return NotFound();
            basket.AddItem(product, quantity);
            
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return StatusCode(201);

            return BadRequest(new ProblemDetails{
                Title = "Problem storing items into basket",
            });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            // get basket
            // remove item or reduce quantity
            // save basket changes to the database
            return Ok();
        }

        private async Task<Basket> RetrieveBasket()
        {
            var buyerIdCookie = Request.Cookies["buyerId"];

            var basket = await _context.Baskets
                .Include(b => b.Items)
                .ThenInclude(i => i.Product)
                .FirstOrDefaultAsync(b => b.BuyerId == buyerIdCookie);
            return basket;
        }

        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookiesOptions = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.Now.AddDays(30)
            };

            Response.Cookies.Append("buyerId", buyerId, cookiesOptions);
            var basket = new Basket
            {
                BuyerId = buyerId
            };

            _context.Baskets.Add(basket);

            return basket;
        }
    }
}