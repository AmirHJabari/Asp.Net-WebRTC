using System.Dynamic;

namespace Server.Hubs.Models;

public class CallerCandidateRequest : BaseMsg
{
    public ExpandoObject Candidate { get; set; } = new ExpandoObject();
}
