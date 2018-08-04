### back-end for test based on spring mvc

- set a proxyTable in /config/index.js (proxy /api target at localhost:8081 )

```
  @RequestMapping("/login")
    @ResponseBody
    public MapResult login(){
        MapResult mapResult = new MapResult();
        mapResult.put("username", "username");
        return mapResult;
    }
```