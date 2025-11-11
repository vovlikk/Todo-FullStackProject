using Microsoft.AspNetCore.Mvc;

namespace TodoList_Fullstack.Interface.Support
{
    public interface ISupportInterface
    {
        Task<bool> SendSmsToSupport(string sms);
    }
}
