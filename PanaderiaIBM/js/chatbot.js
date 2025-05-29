  window.watsonAssistantChatOptions = {
    integrationID: "7a2ad68c-9748-4d29-a226-cfc824939f93", // The ID of this integration.
    region: "us-south", // The region your integration is hosted in.
    serviceInstanceID: "8fd9f306-eb0c-418e-a4e1-679922ac4c37", // The ID of your service instance.
    onLoad: async (instance) => { await instance.render(); }
  };
  setTimeout(function(){
    const t=document.createElement('script');
    t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
    document.head.appendChild(t);
  });
