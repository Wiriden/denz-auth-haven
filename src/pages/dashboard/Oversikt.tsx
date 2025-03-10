import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/context/UserContext";
import { getActivities, getItemAssignments, getItems, getUserCertificates } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import {
    Filter,
    Hammer,
    Search,
    Shield,
    Users
} from "lucide-react";
import React, { useEffect } from "react";

const SkeletonCard = () => (
  <div className="space-y-3">
    <Skeleton className="h-6 w-1/3" />
    <Skeleton className="h-4 w-1/2" />
    <Skeleton className="h-16 w-full" />
  </div>
);

const Oversikt: React.FC = () => {
  const { user, loading: userLoading } = useUser();

  // Hämta data med React Query
  const { data: activities, isLoading: activitiesLoading } = useQuery({
    queryKey: ['activities'],
    queryFn: () => getActivities(5)
  });

  const { data: certificates, isLoading: certificatesLoading } = useQuery({
    queryKey: ['certificates'],
    queryFn: () => getUserCertificates(user?.id)
  });

  const { data: toolItems, isLoading: toolsLoading } = useQuery({
    queryKey: ['tools'],
    queryFn: () => getItems(undefined, undefined, 'tool'),
    enabled: !userLoading // Kör endast när user är laddad
  });

  const { data: safetyItems, isLoading: safetyLoading } = useQuery({
    queryKey: ['safety'],
    queryFn: () => getItems(undefined, undefined, 'safety'),
    enabled: !userLoading // Kör endast när user är laddad
  });

  const { data: activeAssignments, isLoading: assignmentsLoading } = useQuery({
    queryKey: ['assignments'],
    queryFn: () => getItemAssignments(user?.id),
    enabled: !userLoading && !!user?.id // Kör endast när user är laddad och har ett ID
  });

  // Lägg till lite loggning för debugging
  useEffect(() => {
    console.log("Översikt renderad, user:", user?.name, "userLoading:", userLoading);
    console.log("Data loading status:", {
      activities: activitiesLoading,
      certificates: certificatesLoading,
      tools: toolsLoading,
      safety: safetyLoading,
      assignments: assignmentsLoading
    });
  }, [
    user, userLoading, 
    activitiesLoading, certificatesLoading, 
    toolsLoading, safetyLoading, assignmentsLoading
  ]);

  // Beräkna certifikatdata
  const certificatesCount = certificates?.length || 0;
  const expiringCertificates = certificates?.filter(cert => cert.days_left && cert.days_left < 60) || [];

  // Beräkna verktygsdata
  const toolsCount = toolItems?.length || 0;
  const toolsInMaintenance = toolItems?.filter(item => item.status === 'maintenance') || [];

  // Beräkna skyddsutrustningsdata
  const safetyCount = safetyItems?.length || 0;
  const checkedOutSafety = safetyItems?.filter(item => item.status === 'checked-out') || [];
  const checkedOutPercentage = safetyCount > 0 ? (checkedOutSafety.length / safetyCount) * 100 : 0;
  const availablePercentage = 100 - checkedOutPercentage;

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-xl font-medium text-denz-text-primary mb-1">Assetmaster Översikt</h1>
        <p className="text-sm text-denz-text-secondary">En överblick över system, tillgångar och certifikat</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Anställda Card */}
        <Card>
          {certificatesLoading ? (
            <CardContent className="p-5">
              <SkeletonCard />
            </CardContent>
          ) : (
            <>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-medium text-denz-text-primary">Anställda</CardTitle>
                    <p className="text-xs text-denz-text-secondary mt-1">Certifikatstatus</p>
                  </div>
                  <div className="p-2 rounded bg-denz-primary/5">
                    <Users className="h-5 w-5 text-denz-primary" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm text-denz-text-secondary">Aktiva certifikat</p>
                  </div>
                  <div>
                    <Badge variant="outline" className="bg-denz-darker text-denz-text-primary">
                      {certificatesCount}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  {expiringCertificates.slice(0, 2).map((cert) => (
                    <div key={cert.id} className="flex items-center justify-between p-3 rounded bg-denz-bg-hover">
                      <div>
                        <p className="text-sm font-medium text-denz-text-primary">{cert.certificate_name}</p>
                        <p className="text-xs text-denz-text-secondary">{cert.user_name}</p>
                      </div>
                      <Badge variant="outline" className="bg-denz-warning/5 text-denz-warning border-denz-warning/20">
                        {cert.days_left} dagar
                      </Badge>
                    </div>
                  ))}

                  {expiringCertificates.length === 0 && (
                    <div className="p-3 rounded bg-denz-bg-hover text-center">
                      <p className="text-sm text-denz-text-secondary">Inga certifikat går ut snart</p>
                    </div>
                  )}
                </div>

                <Button variant="ghost" className="w-full mt-4 text-denz-text-secondary hover:text-denz-text-primary text-sm">
                  Visa alla certifikat
                </Button>
              </CardContent>
            </>
          )}
        </Card>

        {/* Verktyg Card */}
        <Card>
          {toolsLoading ? (
            <CardContent className="p-5">
              <SkeletonCard />
            </CardContent>
          ) : (
            <>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-medium text-denz-text-primary">Verktyg</CardTitle>
                    <p className="text-xs text-denz-text-secondary mt-1">Underhållstatus</p>
                  </div>
                  <div className="p-2 rounded bg-denz-success/5">
                    <Hammer className="h-5 w-5 text-denz-success" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm text-denz-text-secondary">Under underhåll</p>
                  </div>
                  <div>
                    <Badge variant="outline" className="bg-denz-darker text-denz-text-primary">
                      {toolsInMaintenance.length}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  {toolsInMaintenance.slice(0, 2).map((tool) => (
                    <div key={tool.id} className="flex items-center justify-between p-3 rounded bg-denz-bg-hover">
                      <div>
                        <p className="text-sm font-medium text-denz-text-primary">{tool.name}</p>
                        <p className="text-xs text-denz-text-secondary">{tool.serial_number}</p>
                      </div>
                      <Badge variant="outline" className={`
                        ${tool.status === 'maintenance' ? 'bg-denz-primary/5 text-denz-primary border-denz-primary/20' : ''}
                        ${tool.status === 'checked-out' ? 'bg-denz-warning/5 text-denz-warning border-denz-warning/20' : ''}
                      `}>
                        Underhåll
                      </Badge>
                    </div>
                  ))}

                  {toolsInMaintenance.length === 0 && (
                    <div className="p-3 rounded bg-denz-bg-hover text-center">
                      <p className="text-sm text-denz-text-secondary">Inga verktyg under underhåll</p>
                    </div>
                  )}
                </div>

                <Button variant="ghost" className="w-full mt-4 text-denz-text-secondary hover:text-denz-text-primary text-sm">
                  Schemalägg underhåll
                </Button>
              </CardContent>
            </>
          )}
        </Card>

        {/* Skyddsutrustning Card */}
        <Card>
          {safetyLoading ? (
            <CardContent className="p-5">
              <SkeletonCard />
            </CardContent>
          ) : (
            <>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-medium text-denz-text-primary">Skyddsutrustning</CardTitle>
                    <p className="text-xs text-denz-text-secondary mt-1">Användningsstatus</p>
                  </div>
                  <div className="p-2 rounded bg-denz-accent/5">
                    <Shield className="h-5 w-5 text-denz-accent" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm text-denz-text-secondary">Total skyddsutrustning</p>
                  </div>
                  <div>
                    <Badge variant="outline" className="bg-denz-darker text-denz-text-primary">
                      {safetyCount}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-denz-text-secondary">Utcheckade</span>
                      <span className="text-xs text-denz-text-primary">
                        {checkedOutSafety.length} ({Math.round(checkedOutPercentage)}%)
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-bar-fill bg-denz-warning" 
                        style={{ width: `${checkedOutPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-denz-text-secondary">Tillgängliga</span>
                      <span className="text-xs text-denz-text-primary">
                        {safetyCount - checkedOutSafety.length} ({Math.round(availablePercentage)}%)
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-bar-fill bg-denz-success" 
                        style={{ width: `${availablePercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Button variant="outline" className="text-sm border-denz-border text-denz-text-secondary hover:text-denz-text-primary">
                    Hantera
                  </Button>
                  <Button className="text-sm bg-denz-accent hover:bg-denz-accent/90">
                    Checka ut
                  </Button>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>

      {/* Senaste aktiviteter */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-medium text-denz-text-primary">Senaste aktiviteter</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="text-xs border-denz-border text-denz-text-secondary hover:text-denz-text-primary">
              <Filter className="mr-1" size={12} />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="text-xs border-denz-border text-denz-text-secondary hover:text-denz-text-primary">
              <Search className="mr-1" size={12} />
              Sök
            </Button>
          </div>
        </div>

        <Card>
          {activitiesLoading ? (
            <CardContent className="p-5 space-y-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </CardContent>
          ) : (
            <CardContent className="p-0 divide-y divide-denz-border">
              {activities && activities.length > 0 ? activities.map((activity) => (
                <div key={activity.id} className="p-4 flex items-center justify-between hover:bg-denz-bg-hover transition-colors">
                  <div>
                    <Badge className={`
                      ${activity.priority === 'low' ? 'bg-denz-success/5 text-denz-success border-denz-success/20' : ''}
                      ${activity.priority === 'medium' ? 'bg-denz-warning/5 text-denz-warning border-denz-warning/20' : ''}
                      ${activity.priority === 'high' ? 'bg-denz-danger/5 text-denz-danger border-denz-danger/20' : ''}
                      mb-2
                    `}>
                      {activity.priority === 'low' ? 'Låg' : activity.priority === 'medium' ? 'Medium' : 'Hög'}
                    </Badge>
                    <p className="text-sm font-medium text-denz-text-primary">{activity.title}</p>
                    <p className="text-xs text-denz-text-secondary">{activity.description}</p>
                  </div>
                  <span className="text-xs text-denz-text-secondary whitespace-nowrap">
                    {activity.date}, {new Date(activity.timestamp).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              )) : (
                <div className="p-4 text-center">
                  <p className="text-sm text-denz-text-secondary">Inga aktiviteter att visa</p>
                </div>
              )}
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Oversikt;
