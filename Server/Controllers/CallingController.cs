using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Server.Hubs;
using Server.Hubs.Models;
using Server.Models;

namespace Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CallingController : ControllerBase
{
    private readonly IHubContext<WebRTCHub> _hubContext;

    public CallingController(IHubContext<WebRTCHub> hubContext)
    {
        _hubContext = hubContext;
    }

    [HttpPost("Call")]
    public async Task<ActionResult> Call(CallRequest request)
    {
        var exists = WebRTCHub.Connections.ContainsKey(request.ToUserId);

        if (exists)
        {
            if (request.ToUserId == request.FromUserId)
            {
                return BadRequest(new
                {
                    Message = "You want to talk to yourself! Sometimes people need that."
                });
            }

            var client = _hubContext.Clients.Client(request.ToUserId);
            await client.SendAsync("PreOffer", new PreOfferRequest()
            {
                FromUserId = request.FromUserId,
                ToUserId = request.ToUserId,
                UserName = WebRTCHub.Connections[request.FromUserId],
                CallType = "DIRECT_CALL"
            });

            return Ok(new
            {
                UserName = WebRTCHub.Connections[request.ToUserId]
            });
        }
        else
        {
            return BadRequest(new
            {
                Message = "User id is invalid!"
            });
        }
    }
}
