using System.Dynamic;

namespace Server.Hubs.Models;

public class CalleeCandidateRequest
{
    public ExpandoObject Candidate { get; set; } = new ExpandoObject();
    public string Destination { get; set; }
}
