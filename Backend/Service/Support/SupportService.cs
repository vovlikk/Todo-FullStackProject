using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using TodoList_Fullstack.Data;
using TodoList_Fullstack.Interface.Support;
using TodoList_Fullstack.Models.Support;

namespace TodoList_Fullstack.Service.Support
{
    public class SupportService : ISupportInterface
    {
        private readonly TodoListDbContext _todoListDbContext;

        public SupportService(TodoListDbContext todoListDbContext)
        {
            _todoListDbContext = todoListDbContext;
        }
        public async Task<bool> SendSmsToSupport(string sms)
        {
            if(sms.Length > 500)
            {
                return false;
            }

            var newSupportSms = new SupportSms
            {
                Title = sms,
                
            };

            _todoListDbContext.Supports.Add(newSupportSms);
            await _todoListDbContext.SaveChangesAsync();

            return true;

        }

    }
}
