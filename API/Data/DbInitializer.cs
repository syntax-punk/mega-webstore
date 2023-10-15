using Entities;

namespace API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(StoreContext context) 
        {
            if (context.Products.Any()) return;

            var products = new List<Product>
            {
                new Product
                {
                    Name = "Valios Speedster Board 2000",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 20000,
                    PictureUrl = "/images/products/sb-ang1.png",
                    Brand = "Valios",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Valios Pegasus Board 3000",
                    Description = "Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.",
                    Price = 15000,
                    PictureUrl = "/images/products/sb-ang2.png",
                    Brand = "Valios",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Noco Speed Rusher 3",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 18000,
                    PictureUrl = "/images/products/sb-core1.png",
                    Brand = "Noco",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Noco XtremeGrip Board",
                    Description =
                        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    Price = 30000,
                    PictureUrl = "/images/products/sb-core2.png",
                    Brand = "Noco",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "FrostSlide Board Super Whizzy Fast",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 25000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "FrostSlide",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "StarGazer Board",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 12000,
                    PictureUrl = "/images/products/sb-ts1.png",
                    Brand = "Moll",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "SpeedChaser Helm",
                    Description =
                        "Noco posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1000,
                    PictureUrl = "/images/products/helm-core1.png",
                    Brand = "Noco",
                    Type = "Helmets",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "BloodMoon Runner",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 8000,
                    PictureUrl = "/images/products/helm-react1.png",
                    Brand = "Noco",
                    Type = "Helments",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Arctic Shock 3000",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1500,
                    PictureUrl = "/images/products/helm-react2.png",
                    Brand = "Noco",
                    Type = "Helmets",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Instant Death II",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1500,
                    PictureUrl = "/images/products/helm-react3.png",
                    Brand = "Noco",
                    Type = "Helmets",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Frozen Shaman",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1500,
                    PictureUrl = "/images/products/helm-react4.png",
                    Brand = "Noco",
                    Type = "Helments",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "BeetleIce 2003",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1800,
                    PictureUrl = "/images/products/glove-code1.png",
                    Brand = "FrostSlide",
                    Type = "Gloves",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "HazelGold Dreamer Gloves",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1500,
                    PictureUrl = "/images/products/glove-code2.png",
                    Brand = "FrostSlide",
                    Type = "Gloves",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Kava BackSlap Copper",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1600,
                    PictureUrl = "/images/products/glove-react1.png",
                    Brand = "Kava",
                    Type = "Gloves",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Skirrra Razer Gloves",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1400,
                    PictureUrl = "/images/products/glove-react2.png",
                    Brand = "Moll",
                    Type = "Gloves",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Kava Spider Boots",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 25000,
                    PictureUrl = "/images/products/boot-redis1.png",
                    Brand = "Kava",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Moll RedMoon Dancer",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 18999,
                    PictureUrl = "/images/products/boot-core2.png",
                    Brand = "Moll",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Kava Killer Stomp",
                    Description =
                        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    Price = 19999,
                    PictureUrl = "/images/products/boot-core1.png",
                    Brand = "Kava",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "NopPain NoGain Boots",
                    Description = "Aenean nec lorem. In porttitor. Donec laoreet nonummy augue.",
                    Price = 15000,
                    PictureUrl = "/images/products/boot-ang2.png",
                    Brand = "Moll",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Valios Moon Walker Boots",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 18000,
                    PictureUrl = "/images/products/boot-ang1.png",
                    Brand = "Valios",
                    Type = "Boots",
                    QuantityInStock = 100
                },
            };

            context.Products.AddRange(products);

            context.SaveChanges();
        }
    }
}