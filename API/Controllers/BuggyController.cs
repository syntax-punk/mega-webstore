using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound() 
        {
            return NotFound();
        }

        [HttpGet("bad-request")]
        public ActionResult GetBadRequest() 
        {
            var problemDetails = new ProblemDetails{
                Title = "This is a very very bad request"
            };

            return BadRequest(problemDetails);
        }

        [HttpGet("unauthorized")]
        public ActionResult GetUnauthorized() 
        {
            return Unauthorized();
        }

        [HttpGet("validation-error")]
        public ActionResult GetValidationError() 
        {
            ModelState.AddModelError("Problem 1", "This is the first validation error");
            ModelState.AddModelError("Problem 2", "This is the second validation error");
            return ValidationProblem();
        }

        [HttpGet("server-error")]
        public ActionResult GetServerError() 
        {

            throw new Exception("This is a massive server outage error");
        }
    }
}