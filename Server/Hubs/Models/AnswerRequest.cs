using System.Dynamic;

namespace Server.Hubs.Models;

public class AnswerRequest
{
    public ExpandoObject Answer { get; set; } = new ExpandoObject();
    public string Destination { get; set; }
}
