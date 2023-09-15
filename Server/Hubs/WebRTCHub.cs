using Microsoft.AspNetCore.SignalR;
using Server.Hubs.Models;
using System.Collections.Concurrent;

namespace Server.Hubs;

public class WebRTCHub : Hub
{
    static ConcurrentDictionary<string, string> _connections = new();
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

    public Task PreOffer(PreOfferRequest request)
    {
        var exists = _connections.ContainsKey(request.ToUserId);
        if (exists && request.ToUserId != Context.ConnectionId)
        {
            var client = Clients.Client(request.ToUserId);
            return client.SendAsync("PreOffer", request);
        }
        else
        {
            return Clients.Caller.SendAsync("ToastError", new ToastError
            {
                Message = "User id is invalid!"
            });
        }
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