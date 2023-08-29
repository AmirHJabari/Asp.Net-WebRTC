using Microsoft.AspNetCore.SignalR;

namespace Server.Hubs;

public class WebRTCHub : Hub
{
    public override Task OnConnectedAsync()
    {
        Console.WriteLine(Context.ConnectionId);
        return base.OnConnectedAsync();
    }
}