using Microsoft.AspNetCore.SignalR;
using Server.Hubs.Models;

namespace Server.Hubs;

public class WebRTCHub : Hub
{
    public override Task OnConnectedAsync()
    {
        Console.WriteLine(Context.ConnectionId);
        return base.OnConnectedAsync();
    }


    public Task Offer(OfferRequest request)
    {
        Console.WriteLine("from " + request.FromId);
        Console.WriteLine("to " + request.ToId);
        Console.WriteLine("sdp " + request.Offer.Sdp);
        Console.WriteLine("type " + request.Offer.Type);

        var client = Clients.Client(request.ToId);
        return client.SendAsync("Offer", request);
    }
    
    public Task Answer(OfferRequest request)
    {
        var client = Clients.Client(request.ToId);
        return client.SendAsync("Answer", request);
    }
}