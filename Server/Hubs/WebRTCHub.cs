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
        var client = Clients.Client(request.ToSocketId);
        return client.SendAsync("offer", request);
    }

    public Task Answer(AnswerRequest data)
    {
        return Clients.Client(data.Destination).SendAsync("answer", data);
    }

    public Task CallerCandidate(CallerCandidateRequest data)
    {
        var client = Clients.Client(data.ToSocketId);
        return client.SendAsync("callerCandidate", data.Candidate);
    }

    public Task CalleeCandidate(CalleeCandidateRequest data)
    {
        return Clients.Client(data.Destination).SendAsync("calleeCandidate", data.Candidate);
    }
}