package com.api.gateway;

import com.api.gateway.security.AuthorizationHeaderFilter;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RouteConfig {


    // 라우트
    @Bean
    public RouteLocator gatewayRoutes(RouteLocatorBuilder builder,
                                      AuthorizationHeaderFilter authFilter) {
        return builder.routes()
                //first-service
                .route("user-service", r -> r.path("/auth/**")
                        //.filters() filters를 제작하여 인증처리 
                        .uri("lb://USER-SERVICE"))
                .route("test-service", r -> r.path("/test/**")
                        .filters(f -> f.filter(authFilter.apply(new AuthorizationHeaderFilter.Config())))
                        .uri("lb://TEST"))
                .build();
    }

}
