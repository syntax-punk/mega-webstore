using API.DTOs;
using AutoMapper;
using Entities;

namespace API.RequestHelpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<CreateProductDto, Product>();
        }
    }
}