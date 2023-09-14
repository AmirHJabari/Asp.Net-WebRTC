using Microsoft.AspNetCore.SignalR;
using Server.Hubs.Models;
using System.Collections.Concurrent;

namespace Server.Hubs;

public class WebRTCHub : Hub
{
    ConcurrentDictionary<string, string> _connections = new();
    public override Task OnConnectedAsync()
    {
        Console.WriteLine($"User Connected: {Context.ConnectionId}");
        _connections[Context.ConnectionId] = "User Name";

        return base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        Console.WriteLine($"User Disconnected: {Context.ConnectionId}");
        _connections.TryRemove(Context.ConnectionId, out _);

        return base.OnDisconnectedAsync(exception);
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